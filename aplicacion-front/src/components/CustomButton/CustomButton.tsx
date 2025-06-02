// src/components/CustomButton.tsx
import type React from "react";
import "./CustomButton.scss"

// Definición de las propiedades para el componente CustomButton
interface CustomButtonProps {
    children: React.ReactNode; // El contenido del botón (texto o elementos)
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void; // Función que se ejecuta al hacer clic
    type?: 'primary' | 'secondary'; // Tipo de estilo predefinido (ej: 'primary' para el botón principal, 'secondary' para el secundario)
    size?: 'sm' | 'md' | 'lg'; // Tamaño predefinido del botón
    disabled?: boolean; // Para deshabilitar el botón
    className?: string; // Clases CSS adicionales
    fullWidth?: boolean; // Si el botón debe ocupar todo el ancho disponible
    marginTop?: string; // Margen superior opcional
    marginBottom?: string; // Margen inferior opcional
    // Puedes añadir más props si las necesitas, por ejemplo:
    // isLoading?: boolean; // Para mostrar un spinner si está cargando
    // iconLeft?: React.ReactNode; // Para un icono a la izquierda
    // iconRight?: React.ReactNode; // Para un icono a la derecha
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    children,
    onClick,
    type = 'primary', // Valor por defecto: botón primario
    size = 'md',
    disabled = false,
    className = '',
    fullWidth = false,
    marginBottom,
    marginTop,
}) => {

    const classes = [
        'custom-button',
        `custom-button--type-${type}`,
        `custom-button--size-${size}`,
        className, // Añade cualquier clase adicional pasada
        fullWidth ? 'custom-button--full-width' : '', // Añade la clase si fullWidth es true
    ].filter(Boolean); // Filtra los elementos vacíos o falsy

    const inlineStyles: React.CSSProperties = {};
    if (marginBottom) {
        inlineStyles.marginBottom = marginBottom;
    }
    if (marginTop) {
        inlineStyles.marginTop = marginTop;
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={classes.join(' ')}
            style={inlineStyles}
        >
            {children}
        </button>
    );
};