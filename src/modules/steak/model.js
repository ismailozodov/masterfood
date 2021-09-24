import { fetch, fetchAll } from '../../lib/postgres.js'


const STEAKS = `
    select 
        *
    from steaks
    where 
    case
        when $1 > 0 then steak_id = $1
        else true
    end
`


const INSERT_STEAK = `
    insert into steaks (
        steak_name,
        steak_price,
        steak_img
    ) values ($1, $2, $3)
    returning * 
`

const DELETE_STEAK = `
    delete from steaks
    where steak_id = $1
    returning *   
`

const UPDATE_STEAK = `
    with old_data as (
        select
            steak_id,
            steak_name,
            steak_price
        from steaks
        where steak_id = $1    
    ) update steaks s set
        steak_name = (
            case 
                when length($2) > 1 then $2
                else o.steak_name
            end),
        steak_price = (
            case
                when $3 > 0 then $3
                else o.steak_price
            end)
    from old_data o
    where s.steak_id = $1
    returning s.steak_id,
    s.steak_name as new_name, o.steak_name as old_name,
    s.steak_price as new_price, o.steak_price as old_price
`


const steaks = (steakId = 0) => {
    try {
        return fetchAll(STEAKS, steakId)
    }
    catch(error){
        throw error
    }
}

const insertSteak = ({ steakName, steakPrice, steakImg }) => {
    try {
        return fetch(INSERT_STEAK, steakName, steakPrice, steakImg)
    }
    catch (error) {
        throw error
    }
}


const deleteSteak = ({ steakId }) => {
    try {
        return fetch(DELETE_STEAK, steakId)
    }
    catch (error) {
        throw error
    }
}


const updateSteak = ({ steakId, steakName, steakPrice }) => {
    try {
        return fetch(UPDATE_STEAK, steakId, steakName, steakPrice)
    }
    catch (error) {
        throw error
    }
}

export default {
    steaks,
    insertSteak,
    deleteSteak,
    updateSteak
}