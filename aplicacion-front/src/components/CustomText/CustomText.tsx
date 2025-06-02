// src/components/CustomText.tsx
import type React from "react";
import "./CustomText.scss"

// Definición de las propiedades para el componente CustomText
interface CustomTextProps {
    children: React.ReactNode; // El contenido del texto (texto o elementos HTML anidados)
    as?: 'p' | 'span' | 'div' | 'label' | 'strong' | 'em'; // Etiqueta HTML a renderizar
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // Tamaño predefinido del texto
    bold?: boolean | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'; // Peso de la fuente
    color?: string; // Color personalizado (CSS color value)
    className?: string; // Clases CSS adicionales
    align?: 'left' | 'center' | 'right' | 'justify'; // Alineación del texto
    marginTop?: string; // Margen superior personalizado
    marginBottom?: string; // Margen inferior personalizado
    // Puedes añadir más props si las necesitas, por ejemplo:
    // lineHeight?: string;
    // textTransform?: 'uppercase' | 'lowercase' | 'capitalize';
    // textDecoration?: 'none' | 'underline' | 'line-through';
    // fontStyle?: 'normal' | 'italic';
}

export const CustomText: React.FC<CustomTextProps> = ({
    children,
    as: Tag = 'span', // Por defecto, renderiza como <span>, pero puede ser <p>, <div>, etc.
    size = 'md',
    bold = false,
    color,
    className = '',
    align = 'left',
    marginTop,
    marginBottom,
}) => {

    const classes = [
        'custom-text',
        `custom-text--as-${Tag}`, // Por si necesitas estilos específicos para la etiqueta HTML
        `custom-text--size-${size}`,
        `custom-text--align-${align}`,
        className, // Añade cualquier clase adicional pasada
    ];

    // Determina la clase para el peso de la fuente
    if (bold === true) {
        classes.push('custom-text--bold-bold'); // Clase para bold por defecto (si es booleano true)
    } else if (typeof bold === 'string') {
        classes.push(`custom-text--bold-${bold}`); // Clase para bold específico (ej: 'semibold')
    }

    // Construye los estilos inline si se pasan propiedades personalizadas
    const inlineStyles: React.CSSProperties = {};
    if (color) {
        inlineStyles.color = color;
    }
    if (marginTop) {
        inlineStyles.marginTop = marginTop;
    }
    if (marginBottom) {
        inlineStyles.marginBottom = marginBottom;
    }

    // Renderiza el elemento HTML según la prop 'as'
    return (
        <Tag className={classes.filter(Boolean).join(' ')} style={inlineStyles}>
            {children}
        </Tag>
    );
};