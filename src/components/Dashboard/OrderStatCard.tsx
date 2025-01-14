interface OrderStatCardProps {
    title: string;
    value: string;
    description: string;
    icon: React.ReactNode;
  }
  
  const OrderStatCard: React.FC<OrderStatCardProps> = ({ title, value, description, icon }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-2 md:p-4 flex items-center space-x-4">
        <div className="p-3 bg-blue-100 rounded-full">{icon}</div>
        <div>
          <h3 className="text-sm md:text-lg font-semibold text-gray-700">{title}</h3>
          <p className="text-lg md:text-2xl font-bold text-blue-500">{value}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
    );
  };
  
  export default OrderStatCard;