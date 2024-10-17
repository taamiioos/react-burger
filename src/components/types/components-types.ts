import { ReactNode } from "react";

export interface IIngredient {
    readonly _id: string;
    readonly name: string;
    readonly image: string;
    count?: number;
    readonly price: number;
    type: 'bun' | 'sauce' | 'main';
    readonly calories: number;
    readonly proteins: number;
    readonly fat: number;
    readonly carbohydrates: number;
    uniqueId?: string;
}

// Props
export interface IIngredientProps {
    ingredient: IIngredient;
    handleModalOpen: (ingredient: IIngredient) => void;
}
export interface IDraggableIngredientProps {
    ingredient: IIngredient;
    index: number;
    moveIngredient: (dragIndex: number, hoverIndex: number) => void;
    handleRemoveIngredient: (index: number, ingredientId: string) => void;
}
// Props


//Modal
export interface IModal {
    children: React.ReactNode;
    onClose: () => void;
    title: string;
}
export interface IModalOverlay {
    onClose: () => void;
}
//Modal

//Route
export interface ProtectedRouteElementProps {
    children: ReactNode;
}
export interface RestrictedRouteProps {
    children: ReactNode;
}
//Route