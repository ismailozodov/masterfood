import model from './model.js'

export default {
    Query: {
        orders: async (_, { orderId, tableId, pagination = {} }) => await model.orders(orderId, tableId, pagination)
    },

    Mutation:{
        addOrder: async (_, args) => {
            try {
                let order = await model.insertOrder(args)
                if(order){
                    return{
                        status: 201,
                        message: 'The new order has been added',
                        data: order
                    }
                }else throw new Error('This place is busy')
            } catch (error) {
                return {
                    status: 400,
                    message: error,
                    data: null
                }
            }
        },
        addOrderSet: async (_, args) => {
            try {
                let order = await model.insertOrderSets(args)
                if(order){
                    return{
                        status: 201,
                        message: 'The new order sets has been added',
                        data: order
                    }
                }else throw new Error('error')
            } catch (error) {
                return {
                    status: 400,
                    message: error,
                    data: null
                }
            }
        },
        deleteOrder: async (_, args) => {
            try {
                let order = await model.deleteOrder(args)
                if(order){
                    return{
                        status: 201,
                        message: 'The new order has been deleted',
                        data: order
                    }
                }else throw new Error('error')
            } catch (error) {
                return {
                    status: 400,
                    message: error,
                    data: null
                }
            }
        },
        deleteOrderSet: async (_, args) => {
            try {
                let order = await model.deleteOrderSet(args)
                if(order){
                    return{
                        status: 201,
                        message: 'The new order sets has been deleted',
                        data: order
                    }
                }else throw new Error('error')
            } catch (error) {
                return {
                    status: 400,
                    message: error,
                    data: null
                }
            }
        },
        updateOrder: async (_, args) => {
            try {
                let order = await model.updateOrder(args)
                if(order){
                    return{
                        status: 201,
                        message: 'The order has been update',
                        data: order
                    }
                }else throw new Error('error')
            } catch (error) {
                return {
                    status: 400,
                    message: error,
                    data: null
                }
            }
        },
        payAdd : async (_,args) => {
            try {
                let pay = await model.payAdd(args)
                if(pay){
                    return{
                        status: 201,
                        message: 'The order has been pay',
                        data: pay
                    }
                }else throw new Error('error')
            } catch (error) {
                return {
                    status: 400,
                    message: error,
                    data: null
                }
            }
        }
    },

    Order: {
        orderId:        global => global.order_id,    
        tableNumber:    global => global.table_number,  
        orderPaid:      global => global.order_paid,  
        orderSets:      global => global.order_sets,  
        orderCreatedAt: global => global.order_created_at,  
        orderPrice:     global => global.order_total_price  
    },
    OrderSet: {
        orderSetId:  global => global.order_set_id
    }
}