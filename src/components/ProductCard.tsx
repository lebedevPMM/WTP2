import React from 'react'

interface ProductCardProps {
    title: string
    description: string
    gradient: string
    pillText: string
    features: string[]
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, gradient, pillText, features }) => {
    return (
        <div className="product-card">
            <div className="product-bg" style={{ background: gradient }} />
            <div className="product-card-content">
                <span className="pill" style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)' }}>
                    {pillText}
                </span>
                <h4>{title}</h4>
                <p className="text-body" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', marginBottom: '16px' }}>
                    {description}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                    {features.map((feature, index) => (
                        <li key={index} style={{ marginBottom: index === features.length - 1 ? 0 : '6px' }}>
                            → {feature}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ProductCard
