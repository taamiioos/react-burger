import React from "react";

export const useModal = () => {
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

    const openModal = React.useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const closeModal = React.useCallback(() => {
        setIsModalOpen(false);
    }, []);

    return { isModalOpen, openModal, closeModal };
};
