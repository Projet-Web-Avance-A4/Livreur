import { useState } from 'react';

export const useModal = () => {
    const [isConfirmOrderModalOpen, setIsConfirmOrderModalOpen] = useState(false);

    function openConfirmOrderModal() {
        setIsConfirmOrderModalOpen(true);
    }

    function closeConfirmOrderModal() {
        setIsConfirmOrderModalOpen(false);
    }

    return {
        isConfirmOrderModalOpen,
        openConfirmOrderModal,
        closeConfirmOrderModal,

    };
};
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
