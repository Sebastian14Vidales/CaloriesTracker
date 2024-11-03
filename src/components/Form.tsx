import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuiddv4 } from 'uuid'
import { categories } from "../data/categories"
import { Activities } from '../types/index';
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FormProps = {
    dispatch: Dispatch<ActivityActions>
    state: ActivityState
}

const initialState : Activities = {
    id: uuiddv4(),
    category: 1,
    name: '',
    calories: 0
}

export default function Form({ dispatch, state }: FormProps) {

    const [activity, setActivity] = useState<Activities>(initialState);

    useEffect(() => {
        if(state.activeId) {
            const selectedActivity = state.activities.filter(activity => activity.id === state.activeId) [0]                  
            setActivity(selectedActivity)
        }
            
    }, [state.activeId])
    

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id);
        // Here, if I write on the field either category or calories, so IsNumberField will be true, if not it will be False

        setActivity({
            ...activity, //Make a copy from our state. We can't lose the reference
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const { name, calories } = activity;
        return name.trim() !== '' && calories > 0

    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch({ type: "save-activity", payload: { newActivity: activity } })
        setActivity({
            ...initialState,
            id: uuiddv4() 
        })
    }

    return (
        <form
            className="space-y-5 rounded-lg bg-white shadow p-10"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoria:</label>
                <select
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}

                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Actividad:</label>
                <input
                    type="text"
                    id="name"
                    value={activity.name}
                    onChange={handleChange}
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicios, Pesas, Bicicleta"
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calorias:</label>
                <input
                    type="number"
                    id="calories"
                    value={activity.calories}
                    onChange={handleChange}
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Calorias. Ej. 300 o 500"
                />
            </div>

            <input
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
                value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
                disabled={!isValidActivity()}
            />
        </form>
    )
}
