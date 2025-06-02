import "./CustomLink.scss"; // Asegúrate de tener un archivo SCSS para los estilos

// Definición de las propiedades para el componente CustomLink
interface CustomLinkProps {
    children: React.ReactNode; // El contenido del enlace (texto o elementos)
    href: string; // La URL a la que apunta el enlace
    target?: '_self' | '_blank' | '_parent' | '_top'; // Dónde abrir el enlace
    rel?: string; // Atributo rel para seguridad y SEO (ej: 'noopener noreferrer')
    type?: 'primary' | 'secondary' | 'text' | 'button'; // Tipo de estilo predefinido (ej: 'primary' para botones, 'text' para enlaces normales)
    size?: 'xs' | 'sm' | 'md' | 'lg'; // Tamaño predefinido para enlaces tipo botón
    bold?: boolean | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'; // Peso de la fuente
    color?: string; // Color personalizado (CSS color value)
    underline?: boolean | 'hover'; // Si el enlace debe tener subrayado (siempre o solo al hover)
    className?: string; // Clases CSS adicionales
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void; // Manejador de eventos onClick
    // Puedes añadir más props si las necesitas, por ejemplo:
    // isDisabled?: boolean;
}

export const CustomLink: React.FC<CustomLinkProps> = ({
    children,
    href,
    target = '_self', // Valor por defecto: abre en la misma ventana
    rel,
    type = 'text', // Por defecto: un enlace de texto normal
    size = 'md',
    bold = false,
    color,
    underline = 'hover', // Por defecto: subrayado solo al hacer hover
    className = '',
    onClick,
}) => {

    const classes = [
        'custom-link',
        `custom-link--type-${type}`,
        `custom-link--size-${size}`, // Relevante para 'type="button"'
        className, // Añade cualquier clase adicional pasada
    ];

    // Determina la clase para el peso de la fuente
    if (bold === true) {
        classes.push('custom-link--bold-bold'); // Clase para bold por defecto (si es booleano true)
    } else if (typeof bold === 'string') {
        classes.push(`custom-link--bold-${bold}`); // Clase para bold específico (ej: 'semibold')
    }

    // Determina la clase para el subrayado
    if (underline === true) {
        classes.push('custom-link--underline-always');
    } else if (underline === 'hover') {
        classes.push('custom-link--underline-hover');
    } else if (underline === false) {
        classes.push('custom-link--underline-none');
    }


    // Construye los estilos inline si se pasa un color personalizado
    const inlineStyles: React.CSSProperties = {};
    if (color) {
        inlineStyles.color = color;
    }

    return (
        <a
            href={href}
            target={target}
            rel={rel}
            className={classes.filter(Boolean).join(' ')} // Filtra los elementos falsy (ej. '')
            style={inlineStyles}
            onClick={onClick}
        >
            {children}
        </a>
    );
};