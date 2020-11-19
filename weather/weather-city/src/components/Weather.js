import React from 'react'
import { Card } from '@shopify/polaris'
import { ThumbUp, Favorite } from '../components/icons'
import { makeId } from './helpers'

export const Weather = ({ element, isLike, handlerLikes, weather }) => {
    return (
        element.length &&
        element.map((el) => {
            return (
                <div key={makeId(5)} className={'wrapper'}>
                    <h2 className="cities__title">{el.name}</h2>
                    <div className="cities__cards">
                        <Card title={el.weather[0].main} sectioned>
                            <p>{el.weather[0].description}</p>
                        </Card>
                        {isLike ? (
                            <Favorite className={'cities__icon'} />
                        ) : (
                            <ThumbUp
                                onClick={() => {
                                    handlerLikes(weather)
                                }}
                                className={'cities__icon'}
                            />
                        )}
                    </div>
                </div>
            )
        })
    )
}
