import React from 'react'

interface ProductCardProps {
    title: string
    description: string
    gradient: string
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, gradient }) => {
    return (
        <div className="product-card">
            <div className="product-bg" style={{ background: gradient }} />
            <div className="product-card-content">
                <h4>{title}</h4>
                <p className="text-body" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px' }}>
                    {description}
                </p>
            </div>
        </div>
    )
}

export default ProductCard
