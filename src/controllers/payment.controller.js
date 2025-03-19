import {z} from "zod";
const paymentSchema = z.object({
    data: z.string().datetime(), 
    valor: z.number().positive(),
    numero: z.number().int().positive(),
    observacao: z.string().optional(),
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
    },
   async updatePayment(req, res) {
   try {
    const {id} = req.params;
    const {valor, numero, data, observacao} = req.body;
    paymentSchema.parse({valor, numero, data, observacao});
    console.log({valor, numero, data, observacao});  
    res.status(200).json({message: 'Payment updated sucessfuly',
                         data: {id, valor, numero, data, observacao }});                   
   } catch (error) {
    if (error instanceof z.ZodError) {
       return res.status(400).json({message: 'Validation error',
          details:error.errors});
    }
    return res.status(500).json({message: error.message});
   }
   },

   async deletePayment(req, res) {
    try {
        const {id} = req.params;
       return res.status(200).json({message: 'Payment deleted sucessfuly', id});
    } catch (error) {
       return res.status(500).json({message: "Internal server error"});
    }
   },
};


export default paymentController;