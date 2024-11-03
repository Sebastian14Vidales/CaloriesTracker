import { useMemo } from 'react';
import { Activities } from '../types/index';
import CalorieDisplay from './CalorieDisplay';

type CalorieTrackerProps = {
    activities: Activities[]
}

export default function CalorieTracker({ activities }: CalorieTrackerProps) {

    // Contadores
    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities])
    const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities])
    const totalCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities])
    return (
        <>
            <h2 className='text-4xl font-black text-white text-center'>Resumen de Calorías</h2>

            <div className='flex flex-col items-center md:flex-row md:justify-between gap-5 text-xl mt-10'>
                <CalorieDisplay
                    calories={caloriesConsumed}
                    text='Calorías Consumidas'
                />
                <CalorieDisplay
                    calories={caloriesBurned}
                    text='Calorías Ganadas'
                />
                <CalorieDisplay
                    calories={totalCalories}
                    text='Diferencia'
                />
            </div>
        </>
    )
}
