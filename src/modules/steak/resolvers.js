import model from './model.js'

export default {
    Query: {
        steaks: async (_, { steakId }) => await model.steaks(steakId)
    },

    Mutation: {
        addSteak: async (_, args) => {
            try {
                let steak = await model.insertSteak(args)
                if(steak) {
                    return {
                        status: 201,
                        message: 'The new steak has been added !',
                        data: steak
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

        deleteSteak: async (_, args) => {
            try {
                let steak = await model.deleteSteak(args)
                if(steak) {
                    return {
                        status: 201,
                        message: 'The steak has been deleted !',
                        data: steak
                    }
                }
                else throw new Error("There is no such steak !")

            }
            catch(error) {
                return {
                    status: 400,
                    message: error.message,
                    data: null
                }
            }
        },

        updateSteak: async (_, args) => {
            try {
                let steak = await model.updateSteak(args)
                if(steak) {
                    return {
                        status: 201,
                        message: 'The steak has been updated !',
                        data: steak
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
        }

    },

    Steak: {
        steakId:    global => global.steak_id,
        steakName:  global => global.steak_name,
        steakPrice: global => global.steak_price,
        steakImg:   global => global.steak_img
    }

}