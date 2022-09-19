using Application.Context;
using Application.Models;
using Microsoft.EntityFrameworkCore;

namespace Application.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _applicationDb;

        public ProductRepository(ApplicationDbContext context)
        {
            _applicationDb = context;
        }

        public bool InsertProduct(ProductModel product)
        {
            try
            {
                _applicationDb.Tb_Product.Add(product);
                _applicationDb.SaveChanges();

                return true;
            } catch (Exception)
            {
                throw;
            }
        }

        public bool UpdateProduct(ProductModel product)
        {
            try
            {
                ProductModel? productUpdate = _applicationDb.Tb_Product.Where(el => el.Id == product.Id).FirstOrDefault();
                if (productUpdate != null)
                {
                    productUpdate.Id = product.Id;
                    productUpdate.Name = product.Name;
                    productUpdate.Image = product.Image;
                    productUpdate.Description = product.Description;
                    productUpdate.Stock = product.Stock;
                    productUpdate.Status = product.Status;
                    productUpdate.Price = product.Price;
                    productUpdate.New_Price = product.New_Price;
                }
                _applicationDb.SaveChanges();

                return true;
            } catch (Exception)
            {
                throw;
            }
        }

        public bool DeleteProduct(int id)
        {
            try
            {
                _applicationDb.Remove(GetProductById(id));
                _applicationDb.SaveChanges();

                return true;
            } catch (Exception)
            {
                throw;
            }
        }

        public List<ProductModel> GetAllProducts()
        {
            try
            {
                List<ProductModel> products = _applicationDb.Tb_Product.ToList();

                return products;
            } catch (Exception)
            {
                throw;
            }

        }

        public ProductModel GetProductById(int id)
        {
            try
            {
                ProductModel product = _applicationDb.Tb_Product.Where(el => el.Id == id).FirstOrDefault()!;

                return product;
            } catch (Exception)
            {
                throw;
            }
        }
        
        public List<ProductModel> GetProductsByName(string name)
        {
            try
            {
                List<ProductModel> product = _applicationDb.Tb_Product.Where(el => el.Name.Contains(name)).ToList()!;

                return product;
            } catch (Exception)
            {
                throw;
            }
        }
    }

    public interface IProductRepository
    {
        bool InsertProduct(ProductModel product);
        bool UpdateProduct(ProductModel product);
        bool DeleteProduct(int id);
        List<ProductModel> GetAllProducts();
        ProductModel GetProductById(int id);
        List<ProductModel> GetProductsByName(string name);
    }
}