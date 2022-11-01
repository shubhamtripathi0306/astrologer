const express = require("express")
const Razorpay = require("razorpay")
const router = express.Router()


var instance = new Razorpay({
    key_id: "rzp_test_ZLymH4jB7F4YbM",
    key_secret:"XwD43eKbEEPVLmVS6bYgfUsV",
  });

  router.get('/payments', (req, res) => {
      var options = {
          amount: 6000*100,
          currency: 'INR',
      };
      instance.orders.create(options, function (err, order) {
          if (err) {
              console.log(err);
          } else {
              console.log(order);
              res.send({amount: order.amount, order_id: order.id});
          }
      });
  });


 router.post('/pay-verify',(req,res) => {
    console.log(req.body);
    body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', 'viper')
                                    .update(body.toString())
                                    .digest('hex');
                                    console.log("sig"+req.body.razorpay_signature);
                                    console.log("sig"+expectedSignature);
    
    if(expectedSignature === req.body.razorpay_signature){
      console.log("Payment Success");
    }else{
      console.log("Payment Fail");
    }
  })

  module.exports = router;