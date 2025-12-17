import { collections } from "../../config/db.js";

export const platformStatistics = async (req) => {
  const usersColl = await collections.users();
  const paymentColl = await collections.payments();
  const orderColl = await collections.orders();

  const totalUsers = await usersColl.count({});

  const [totalPaymentInfo] = await paymentColl
    .aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ])
    .toArray();

  const orderCursor = orderColl
    .find()
    .project({
      mealName: 1,
      price: 1,
      quantity: 1,
      paymentStatus: 1,
      orderStatus: 1,
      createdAt: 1,
    })
    .sort({ createdAt: -1 });
  const orders = await orderCursor.toArray();

  const pendingOrder = orders.filter(
    (order) => order.orderStatus === "pending"
  );

  const deliveredOrder = orders.filter(
    (order) => order.orderStatus === "delivered"
  );

  return {
    totalPayment: totalPaymentInfo.totalAmount,
    totalUsers,
    ordersPending: {
      data: pendingOrder,
      count: pendingOrder.length,
    },
    ordersDelivered: {
      data: deliveredOrder,
      count: deliveredOrder.length,
    },
  };
};
