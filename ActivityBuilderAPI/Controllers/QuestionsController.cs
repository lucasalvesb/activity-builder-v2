using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ActivityBuilderAPI.Data;
using ActivityBuilderAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ActivityBuilderAPI.Controllers
{
    public class QuestionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public QuestionsController(ApplicationDbContext context)
        {
            _context = context;
        }


    [HttpPost]
        public async Task<IActionResult> CreateQuestion([FromBody] Question question)
        {
            if (question == null || string.IsNullOrWhiteSpace(question.Text) || question.Answers.Count < 2)
            {
                return BadRequest("A question must have at least two answers.");
            }

            if (!question.Answers.Any(a => a.IsCorrect))
            {
                return BadRequest("At least one answer must be marked as correct.");
            }

            _context.Questions.Add(question);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetQuestion), new { id = question.Id }, question);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuestion(int id)
        {
            var question = await _context.Questions
                .Include(q => q.Answers)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (question == null)
            {
                return NotFound();
            }

            return Ok(question);
        }
    }
}