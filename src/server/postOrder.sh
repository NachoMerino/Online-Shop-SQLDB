curl \
--header "Content-type: application/json" \
--request POST \
--data '{"customer_id":"43",
          "payment_method_id":3,
          "product_id":"56",
          "price":"565"
          }' \
http://localhost:9090/api/order