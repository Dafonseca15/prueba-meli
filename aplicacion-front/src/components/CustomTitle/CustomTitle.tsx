interface CustomTitleProps {
    children: React.ReactNode; // El contenido del título (texto o elementos)
    level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'; // Nivel de heading HTML
    bold?: boolean | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'; // Peso de la fuente
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'; // Tamaño predefinido
    color?: string; // Color personalizado (CSS color value)
    className?: string; // Clases CSS adicionales
    align?: 'left' | 'center' | 'right' | 'justify'; // Alineación del texto
    marginBottom?: string; // Margen inferior personalizado
    marginTop?: string; // Margen inferior personalizado
    // Puedes añadir más props si las necesitas, por ejemplo:
    // lineHeight?: string;
    // textTransform?: 'uppercase' | 'lowercase' | 'capitalize';
}

export const CustomTitle: React.FC<CustomTitleProps> = ({
    children,
    level = 'h1', // Valor por defecto
    bold = false,
    size = 'md',
    color,
    className = '',
    align = 'left',
    marginBottom,
    marginTop,
}) => {

    const classes = [
        'custom-title',
        `custom-title--level-${level}`,
        `custom-title--size-${size}`,
        `custom-title--align-${align}`,
        className, // Añade cualquier clase adicional pasada
    ];

      // Determina la clase para el peso de la fuente
    if (bold === true) {
        classes.push('custom-title--bold-bold'); // Clase para bold por defecto (si es booleano true)
    } else if (typeof bold === 'string') {
        classes.push(`custom-title--bold-${bold}`); // Clase para bold específico (ej: 'semibold')
    }

    // Construye los estilos inline si se pasa un color o margen inferior personalizado
    const inlineStyles: React.CSSProperties = {};
    if (color) {
        inlineStyles.color = color;
    }
    if (marginBottom) {
        inlineStyles.marginBottom = marginBottom;
    }
    if (marginTop) {
        inlineStyles.marginTop = marginTop;
    }

    // Renderiza el elemento HTML según el `level`
    const Tag = level;
    return (
        <Tag className={classes.filter(Boolean).join(' ')} style={inlineStyles}>
        {children}
        </Tag>
    );
};