import jwt, { JwtPayload } from "jsonwebtoken";

export default function updateDriver(orderId: string) {

  const accessToken = localStorage.getItem('accessToken')
  const decoded: JwtPayload = jwt.verify(accessToken!, 'access_secret_jwt') as JwtPayload;

  const updateDriver = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/order/assignDeliveryman",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idOrder: orderId,
            idDriver: decoded.userId,
            nameDriver: decoded.name,
            phoneDriver: decoded.phone,

          })
        }
      );
    } catch (err) {
      console.error(err);
    }
  };
  updateDriver();

}
