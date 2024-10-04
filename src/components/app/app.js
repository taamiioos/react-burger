import React, {useEffect} from "react";
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Registration from '../pages/registration/registration';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import ForgotPassword from '../pages/forgot-password/forgot-password';
import Login from '../pages/login/login';
import Profile from '../pages/profile/profile';
import ResetPassword from '../pages/reset-password/reset-password';
import {DndProvider} from 'react-dnd';
import {Routes, Route, useLocation, useNavigate, useParams} from 'react-router-dom';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {ProtectedRouteElement} from '../protected-element/protected-route-element';
import {RestrictedRoute} from '../protected-element/restricted-route';
import {useSelector, useDispatch} from 'react-redux';
import IngredientDetails from '../modal/ingredient-details/ingredient-details';
import IngredientDetailsPage from '../modal/ingredient-details/ingrdient-detail-page';
import Page404 from '../pages/404page/404page';
import {Navigate} from 'react-router-dom';
import Modal from '../modal/modal';
import {setIngredients} from '../../services/actions/ingredients-actions';

// У меня не получается сделать так, чтобы при перезагрузке модальное окно оставалось. Помогите пожалуйста.
const App = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {hasVisitedForgotPassword} = useSelector(state => state.authUser);
    const {ingredients, currentIngredient} = useSelector((state) => state.ingredients);
    const location = useLocation();
    const background = location.state?.background;

    useEffect(() => {
        dispatch(setIngredients());
    }, [dispatch]);


    const closeModalIngredient = () => {
        navigate(background ? background.pathname : '/');
    };

    return (
        <div className={styles.app}>
            <AppHeader/>
            <Routes location={background || location}>
                <Route path="/register" element={
                    <RestrictedRoute>
                        <Registration/>
                    </RestrictedRoute>
                }/>
                <Route path="/login" element={
                    <RestrictedRoute>
                        <Login/>
                    </RestrictedRoute>
                }/>
                <Route path="/forgot-password" element={
                    <RestrictedRoute>
                        <ForgotPassword/>
                    </RestrictedRoute>
                }/>
                <Route path="/reset-password" element={
                    <RestrictedRoute>
                        {hasVisitedForgotPassword ? <ResetPassword/> : <Navigate to="/forgot-password" replace/>}
                    </RestrictedRoute>
                }/>
                <Route path="/" element={
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </DndProvider>
                }/>
                <Route path="/profile/*" element={
                    <ProtectedRouteElement>
                        <Profile/>
                    </ProtectedRouteElement>
                }/>
                <Route path="/ingredients/:id" element={<IngredientDetailsPage/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes>

            {background && currentIngredient && (
                <Routes>
                    <Route path="/ingredients/:id" element={
                        <Modal title="Детали ингредиента" onClose={closeModalIngredient}>
                            <IngredientDetails/>
                        </Modal>
                    } />
                </Routes>
            )}
        </div>
    );
};

export default App;