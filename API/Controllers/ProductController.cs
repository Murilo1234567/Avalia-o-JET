
using Application.Models;
using Application.Repositories;
using Application.Validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Application.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]
    public class ProductController : ControllerBase
    {
        public IConfiguration Configuration { get; }
        private readonly IProductRepository _productRepository;
        public ProductController(IConfiguration configuration, IProductRepository productRepository)
        {
            Configuration = configuration;
            _productRepository = productRepository;
        }

        [HttpPost]
        public ActionResult<bool> InsertFaq([FromBody] ProductModel product)
        {
            try
            {
                ProductValidator validator = new();
                validator.Validate(product);

                return _productRepository.InsertProduct(product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public ActionResult<bool> UpdateFaq([FromBody] ProductModel product)
        {
            try
            {
                ProductValidator validator = new();
                validator.Validate(product);
                
                return _productRepository.UpdateProduct(product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public ActionResult<bool> DeleteFaq(int id)
        {
            try
            {
                return _productRepository.DeleteProduct(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public ActionResult<List<ProductModel>> GetAllProducts()
        {
            try
            {
                return _productRepository.GetAllProducts();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public ActionResult<ProductModel> GetProductById(int id)
        {
            try
            {
                return _productRepository.GetProductById(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}