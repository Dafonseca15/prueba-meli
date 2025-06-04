import './CustomButton.scss';

interface CustomButtonProps {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  marginTop?: string;
  marginBottom?: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  type = 'primary',
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
    className,
    fullWidth ? 'custom-button--full-width' : '',
  ].filter(Boolean);

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
