import model from './model.js'

export default {
    Query: {
        tables: async () => await model.tables()
    },

    Mutation: {
        addTable: async (_, args) => {
            try {
                let table = await model.insertTable(args)
                if(table) {
                    return {
                        status: 201,
                        message: 'The new table has been added !',
                        data: table
                    }
                }
                else throw new Error("There is an error !")

            }
            catch(error) {
                return {
                    status: 400,
                    message: error.message,
                    data: null
                }
            }
        },

        deleteTable: async (_, args) => {
            try {
                let table = await model.deleteTable(args)
                if(table) {
                    return {
                        status: 201,
                        message: 'The table has been deleted !',
                        data: table
                    }
                }
                else throw new Error("There is no such table !")

            }
            catch(error) {
                return {
                    status: 400,
                    message: error.message,
                    data: null
                }
            }
        },

    Table: {
        tableId:     global => global.table_id,
        tableNumber: global => global.table_number,
        tableBusy:   global => global.table_busy,
        order:       async global => {
            if(global.table_busy) return await model.order(global.table_id)
            else return null
        }
    }
    }

}