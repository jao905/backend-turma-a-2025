import {z} from "zod";
const paymentSchema = z.object({
    data: z.string().datetime(), 
    numerorecibo: z.string().int().positive(),
    valor: z.number().positive(),
    observacao: z.string().max(100),
}); 

const paymentController = {
    async createPayment(req, res) {
        try {
            const{nome, email, senha} = req.body;
            paymentSchema.parse({nome, email, senha});
            console.log({nome, email, senha});
            // Aqui você pode fazer a lógica para salvar no banco de dados
            res.status(201).json({message: "Payment create sucessfuly"});
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: "Validation error",
                    errors: error.errors.map(
                        err => ({ 
                            atributo: err.path[0],
                            mensagem: err.message
                        })
                    )
                });
            }
            res.status(500).json({message: error.mesage});
            
        }
    }
}

export default paymentController;