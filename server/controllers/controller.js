

module.exports = {

    getOne: function(request, response)
    {
        const {id} = request.params;
        // console.log(request);
        request.app.get('db').read_product(id)
        // i dont really know what exactly this line is doing, i think
        .then((product) =>
        {
            if(product[0])
            response.status(200).send(product)//send(product)
            else response.status(400).json('coudnt find product')
        })
        .catch((error) =>
        {
            console.log('error', error);
            response.status(500).json('couldnt get product');
        })
    },
    getAll: function(request, response)
    {
        request.app.get('db').read_products()
        .then((products) =>
        {
            response.status(200).send(products);
        })
        .catch((error) =>
        {
            console.log('error', error);
            response.status(500).json('couldnt get products');
        })

    },


    create: function(request, response)
    {
        const {name, description, price, image_url} = request.body
        request.app.get('db').create_product([name, description, price, image_url])
        .then(() =>
        {
            response.status(200).json("Product Added");
        })
        .catch((error) =>
        {
            console.log("error", error);
            response.status(500).send("error");
        })
    },
    update: function(request, response)
    {
        const {desc} = request.query;
        const {id} = request.params;
        request.app.get('db').update_product(desc, id)
        .then(() =>
        {
            response.status(200).json("updated product");
        })
        .catch((error) =>
        {
            console.log("error", error);
            response.status(500).json("couldnt update product");
        })
    },
    delete: function(request, response)
    {
        const {id} = request.params;
        request.app.get('db').delete_product(id)
        .then(() =>
        {
            response.status(200).json("product deleted");
        })
        .catch((error) =>
        {
            console.log("error", error);
            response.status(500).json("unable to delete product");
        });
    }

}