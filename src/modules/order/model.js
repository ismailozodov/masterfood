import { fetch, fetchAll } from '../../lib/postgres.js'


const ORDERS = `
    select
        o.order_id,
        o.order_created_at,
        o.order_paid,
        t.table_number,
        sum(os.price) as order_total_price,
        json_agg(os) as order_sets
    from orders o
    natural join tables t    
    inner join (  
        select 
            os.order_set_id,
            os.count,
            os.order_id,
            os.order_set_price * os.count as price,
            row_to_json(s) as steak 
        from order_sets os
        natural join steaks s
        group by os.order_set_id, s.*  
    ) os on os.order_id = o.order_id
    group by o.order_id, t.table_number
`

const INSERT_ORDER = `
	insert into orders (
        table_id
    ) values($1)
    returning * 
`

const INSERT_ORDER_SET = `
	insert into order_sets (
		order_id,
		steak_id,
		count,
		order_set_price
	) select $1, $2, $3, s.steak_price from steaks s
	where s.steak_id = $2
	returning *
`

const DELETE_ORDER = `
	delete from orders
	where order_id = $1
	returning *
`
const DELETE_ORDER_SET = `
	delete from order_sets
	where order_set_id = $1
	returning *
`
const PUT_ORDER = `
	with old_data as (
		select
			count
		from order_sets
		where order_set_id = $1
	) update order_sets os SET
		count = old_data.count + $2
	from old_data
	where order_set_id = $1
	returning os.*
`

const PAY_ORDER = `
    update orders set
        order_paid = true
    where order_id = $1
    returning *
`

const orders = () => {
    try {
       return fetchAll(ORDERS)
    }catch(error) {
        throw error
    }
}


const insertOrder = async ({tableId}) => {
    try {
        let orders = await fetchAll(ORDERS)
        for(let order of orders){
            if(order.order_paid && order.table_id == tableId){
                return fetchAll(INSERT_ORDER, [tableId])
            }
        }
        throw new Error('do not payed')
    } catch (error) {
        throw error
    }
}

const insertOrderSets = async ({orderId,steakId,count}) => {
    try {
        return fetch(INSERT_ORDER_SET, [orderId,steakId,count])
    } catch (error) {
        return error
    }
}

const deleteOrder = ({orderId}) => {
    try {
       return fetch(DELETE_ORDER, [orderId]) 
    } catch (error) {
        throw error
    }
}
const deleteOrderSet = ({orderSetId}) => {
    try {
        return fetch(DELETE_ORDER_SET, [orderSetId])
    } catch (error) {
        throw error
    }
}
const updateOrder = ({orderSetId, count}) => {
    try {
        return fetchAll(PUT_ORDER,[orderSetId, count])
    } catch (error) {
        throw error
    }
}

const payAdd = ({orderId}) => {
    try {
        return fetch(PAY_ORDER, [orderId])
    } catch (error) {
        throw error
    }
}

export default {
    orders,
    insertOrder,
    deleteOrder,
    payAdd,
    updateOrder,
    deleteOrderSet,
    insertOrderSets
}