import { argv } from 'process'

const sliceProcess = argv.slice(2);

if(sliceProcess[0].toUpperCase() === 'GET' && sliceProcess[1].toLowerCase() === 'products' && sliceProcess.length === 2){
    try {
        fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => console.log(data));
    } catch (error) {
        console.error(`Error obteniendo datos: ${error}`)
    }
}else if(sliceProcess[0].toUpperCase() === 'GET' && sliceProcess[1].toLowerCase().includes('products/') && sliceProcess.length === 2){
    try {
        fetch(`https://fakestoreapi.com/${sliceProcess[1]}`)
        .then(response => response.json())
        .then(data => console.log(data));
    } catch (error) {
        console.error(`Error obteniendo dato: ${error}`)
    }
}else if(sliceProcess[0].toUpperCase() === 'POST' && sliceProcess[1].toLowerCase() === 'products'){
    if (sliceProcess.length >= 3){
        try {
            const [, , nombre, precio, categoria] = sliceProcess
            const product = { title:`${nombre}` , price:`${precio}`, category:`${categoria}`};
            fetch('https://fakestoreapi.com/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            })
            .then(response => response.json())
            .then(data => console.log(data));
        } catch (error) {
            console.error(`Error creando datos: ${error}`)
        }
    }else{
        console.log(`Instrucción no identificada. Faltan argumentos`)
    }
}else if(sliceProcess[0].toUpperCase() === 'DELETE' && sliceProcess[1].toLowerCase().includes('products/')){
    try {
        fetch(`https://fakestoreapi.com/${sliceProcess[1]}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => console.log(data));
    } catch (error) {
        console.error(`Error eliminando dato: ${error}`)
    }
}else{
    console.log(`Instrucción no identificada. Ingresa algunas de los siguientes:
        1. GET products
        2. GET products/<product id>
        3. POST products/<name> <price> <category> 
        4. DELETE products/<product id>
    `)
}