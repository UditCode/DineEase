import React, { useEffect, useState } from 'react';
import classes from'./foodPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import Price from '../../components/Price/Price';
import { useCart } from '../../hooks/useCart';
import StarRating from '../../components/StarRating/StarRating';
import Tags from '../../components/Tags/Tags';
import { getById } from '../../services/foodServices';
import NotFound from '../../components/NotFound/NotFound';


export default function FoodPage() 
{
    const [food, setFood] =useState({});
    const { id } = useParams();
    const {addToCart}= useCart();
    const navigate =useNavigate();

    const handleAddToCart =() => {
        addToCart(food);
        navigate('/cart');
    };

    useEffect(() => {getById(id).then(data => setFood(data[0])); 
    }, [id]);
  return(
  <>
        { !food?(<NotFound massage="Food Not Found!" linkText="Back To  Homepage"/>
        ):(
            <div className={classes.container}>
            <img
                className={classes.image}
                src={`/foods/${food.imageUrl}`}
                alt={food.name}
            />

            <div className={classes.details}>
                <div className={classes.header}>
                    <span className={classes.name}>{food.name}</span>
                    <span classNmae={`${classes.favorite} ${food.favorite ? '' : classes.not}`}>
                    ❤
                    </span>
                </div>

                <div className={classes.rating}>
                  <StarRating stars={food.stars} size={25} />
                </div>


                <div className={classes.origins}>
                    {food.origins?.map(origin =>(
                        <span key={origin}>{origin}</span>
                    ))}
                </div>

                <div className={classes.tags}>
                    {food.tags && (
                        <Tags tags={food.tags.map(tag => ({name: tag }))} forFoodPage={true} />
                    )}     
                </div>      

                <div classNmae={classes.cook_time}>
                    <span>
                        Time to cook about <strong>{food.cookTime}</strong> minutes;
                    </span>
                </div>

                <div className={classes.price}>
                    <Price price={food.price} />
                </div> 

                    <button onClick={handleAddToCart}>Add to cart</button>
                 </div>
            </div>
        )}
  
  
  </>
  );

}

