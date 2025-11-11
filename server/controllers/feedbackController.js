import Feedback from "../models/feedbackModel.js";

const sendFeedback = async (req, res) => {
    try {
        const {name, message} = req.body;
        if(!name || !message){
             return res.status(400).json({ success: false, message: 'Name and message are required' });
        }
        const newFeedback = new Feedback({
            name,
            message,
        })
        await newFeedback.save()
        res.status(201).json({ success: true, message: 'Feedback saved successfully!' });
    } catch (error) {
        console.error('Error saving feedback:', error);
       res.status(500).json({ success: false, message: 'Server error' });
    }
}

export default sendFeedback

//   try {
//         const {name, message} = req.body;
//           if (!name || !message) {
//             return res.status(400).json({ success: false, message: 'Name and message are required' });
//     }
//     const newFeedback = new Feedback({
//         name,
//         message,
//     })
//     await newFeedback.save()
//       res.status(201).json({ success: true, message: 'Feedback saved successfully!' });
//     } catch (error) {
//     console.error('Error saving feedback:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//     }