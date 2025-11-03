import React from "react";
import Image from 'next/image';

interface EditButtonProps {
    onStartEdit: () => void;
    onEndEdit: () => void;
    isEditing: boolean;
    disabled?: boolean;
    className?: string;
    title?: string;
    show?: boolean;
    img: string;
}
const EditButton: React.FC<EditButtonProps> = ({
                                                   onStartEdit,
                                                   onEndEdit,
                                                   isEditing,
                                                   disabled = false,
                                                   className = '',
                                                   title = "Click para editar",
                                                   show = false,
                                                   img,
                                               }) => {
    if (!show) return null;

    return (
        <button
            onClick={isEditing ? onEndEdit : onStartEdit}
            disabled={disabled}
            className={className}
            title={title}
            type="button"
        >
            <Image src={img} alt={'Icono para editar'} width={20} height={20} />
        </button>
    );
};


export default EditButton;