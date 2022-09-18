using Application.Models;
using FluentValidation;

namespace Application.Validators
{
    public class ProductValidator : AbstractValidator<ProductModel>
    {
        public ProductValidator()
        {
            RuleFor(c => c.Name).NotEmpty().WithMessage("Por favor selecione um nome para o produto")
                                .NotNull().WithMessage("Por favor selecione um nome para o produto");
            
            RuleFor(c => c.Image).NotEmpty().WithMessage("Por favor, escolha uma imagem para o produto")
                                .NotNull().WithMessage("Por favor, escolha uma imagem para o produto");
            
            RuleFor(c => c.Description).NotEmpty().WithMessage("Por favor selecione uma descrição para o produto")
                                .NotNull().WithMessage("Por favor selecione uma descrição para o produto");
            
            RuleFor(c => c.Stock).NotEmpty().WithMessage("Por favor selecione um estoque para o produto")
                                .NotNull().WithMessage("Por favor selecione um estoque para o produto");
            
            RuleFor(c => c.Status).NotEmpty().WithMessage("Por favor selecione um status para o produto")
                                .NotNull().WithMessage("Por favor selecione um status para o produto");

            RuleFor(c => c.Price).NotEmpty().WithMessage("Por favor selecione um preço para o produto")
                                .NotNull().WithMessage("Por favor selecione um preço para o produto");
            
            RuleFor(c => c.New_Price).NotEmpty().WithMessage("Por favor selecione um novo preço para o produto")
                                .NotNull().WithMessage("Por favor selecione um novo preço para o produto");
        }
    }
}