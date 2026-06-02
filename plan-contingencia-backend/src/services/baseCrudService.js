export const createCrudService = (model) => ({

    create: (data) =>
        model.create(data),

    getAll: (filter = {}) =>
        model.find(filter),


    getById: (id) =>
        model.findById(id),


    update: (id, data) =>
        model.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        ),


    delete: (id) =>
        model.findByIdAndDelete(id)
});