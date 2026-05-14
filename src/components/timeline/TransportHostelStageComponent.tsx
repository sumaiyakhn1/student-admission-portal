import { useEffect, useState } from "react";
import { X, Check } from "lucide-react";
import toast from "react-hot-toast";
// Refreshing IDE to detect new service files...
import { getTransportRoutes, assignTransport } from "../../services/transportApi";

const TransportHostelStageComponent = ({ student, onStudentRefresh }: any) => {
  const [transportData, setTransportData] = useState<any>(null);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [selectedPoint, setSelectedPoint] = useState<any>(null);
  const [isAssigning, setIsAssigning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


  // Helper to format Excel fractional times (e.g. 0.3125 -> 7:30 AM)
  const formatTime = (val: string | number) => {
    if (!val) return "N/A";
    if (typeof val === "string") {
      // If it already looks like a formatted time, just ensure it's clean
      if (val.includes(" AM") || val.includes(" PM") || val.includes(" am") || val.includes(" pm")) {
         return val.toUpperCase().trim();
      }
      if (val.includes(":")) {
         // Try to detect if AM/PM is missing
         return val + " AM"; // Defaulting common for school/transport
      }
    }
    const num = Number(val);
    if (!isNaN(num) && num > 0 && num < 1) {
      const totalMinutes = Math.round(num * 24 * 60);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }
    return String(val).toUpperCase();
  };

  useEffect(() => {
    getTransportRoutes().then((res: any) => setTransportData(res)).catch(console.error);
  }, []);

  const handleConfirm = async () => {
    if (!student?._id || !selectedRoute || !selectedPoint) return;

    try {
      setIsAssigning(true);
      
      // Construct payload for the student edit API
      const payload = {
        ...student,
        id: student._id,
        pickUpTransport: {
          vehicleRouteId: selectedRoute._id,
          vehicleRoute: selectedRoute.name,
          pickUpPoint: selectedPoint.pointName,
          pickUpTime: formatTime(selectedPoint.pickUpTime)
        },
        // Also setting dropTransport with same route for completeness if needed
        dropTransport: {
          vehicleRouteId: selectedRoute._id,
          vehicleRoute: selectedRoute.name,
          dropPoint: selectedPoint.pointName, // Defaulting to same as pickup
          dropTime: "" // Optional
        },
        transportStartDate: new Date().toISOString(),
      };

      // Remove deprecated keys
      delete payload.vehicleRoute;
      delete payload.pickUpPoint;

      await assignTransport(payload);

      setIsSuccess(true);
      toast.success(`Transport assigned: ${selectedRoute.name} - ${selectedPoint.pointName}`);
      
      // Refresh student data to reflect changes (e.g. fee updates)
      if (onStudentRefresh) onStudentRefresh();
      
      // Close drawer after a short delay to show "Done"
      setTimeout(() => {
        setSelectedRoute(null);
        setSelectedPoint(null);
        setIsSuccess(false);
      }, 1500);
    } catch (err: any) {
      console.error("Transport assignment failed:", err);
      toast.error(err?.response?.data?.message || "Failed to assign transport");
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-6 relative overflow-hidden">
      {/* SELECTED TRANSPORT DISPLAY */}
      {student?.pickUpTransport?.vehicleRoute && (
        <div className="bg-green-50 rounded-2xl p-6 border border-green-100 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 mb-1 block">Selected Transport</span>
              <h3 className="text-2xl font-black text-green-700 tracking-tighter uppercase">Route: {student.pickUpTransport.vehicleRoute}</h3>
            </div>
            <div className="bg-green-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-md shadow-green-600/20">
              <Check size={12} strokeWidth={4} /> Assigned
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/60 rounded-xl p-3 border border-green-200/50">
              <p className="text-[9px] font-bold text-green-600 uppercase tracking-wider mb-1">Pickup Point</p>
              <p className="text-sm font-black text-gray-900">{student.pickUpTransport.pickUpPoint}</p>
            </div>
            <div className="bg-white/60 rounded-xl p-3 border border-green-200/50">
              <p className="text-[9px] font-bold text-green-600 uppercase tracking-wider mb-1">Pickup Time</p>
              <p className="text-sm font-black text-gray-900">{student.pickUpTransport.pickUpTime || "N/A"}</p>
            </div>
          </div>
        </div>
      )}

      <div>
        <h4 className="font-bold text-gray-800 mb-3 border-b pb-2 uppercase tracking-wider text-xs">Available Transport Routes</h4>

        {transportData && Array.isArray(transportData) ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {transportData.map((route: any, index: number) => (
              <button
                key={route._id || index}
                onClick={() => {
                  setSelectedRoute(route);
                  setSelectedPoint(null);
                  setIsSuccess(false);
                }}
                className="flex items-center justify-between bg-orange-50/50 p-4 rounded-xl border border-orange-100 hover:border-orange-300 hover:bg-orange-50 transition-all text-left group"
              >
                <div className="flex flex-col">
                  <span className="text-[10px] text-orange-600 font-bold uppercase tracking-tight">Transport Route</span>
                  <span className="font-bold text-gray-900 text-lg group-hover:text-orange-600 transition-colors">Route Name: {route.name}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-orange-100 text-orange-500 shadow-sm group-hover:bg-orange-600 group-hover:text-white transition-all">
                  →
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-gray-400 py-10 justify-center">
            <div className="w-4 h-4 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
            <span className="text-sm font-medium">Loading transport routes...</span>
          </div>
        )}
      </div>

      {/* DRAWER OVERLAY */}
      {selectedRoute && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] transition-opacity animate-in fade-in duration-300"
          onClick={() => {
            if (!isAssigning && !isSuccess) {
              setSelectedRoute(null);
              setSelectedPoint(null);
            }
          }}
        />
      )}

      {/* DRAWER CONTENT */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-[500px] bg-white z-[10000] shadow-2xl transition-transform duration-500 ease-in-out transform flex flex-col ${
          selectedRoute ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight leading-none uppercase">DRAWER HEAD</h2>
            <p className="text-sm text-orange-500 font-bold mt-1 uppercase tracking-widest">Route Selection Details</p>
          </div>
          <button 
            disabled={isAssigning || isSuccess}
            onClick={() => {
              setSelectedRoute(null);
              setSelectedPoint(null);
            }}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-900 disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {selectedRoute && (
            <>
              <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400 mb-2 block">Current Selection</span>
                <h3 className="text-4xl font-black text-orange-600 tracking-tighter">Route {selectedRoute.name}</h3>
                <div className="mt-4 flex gap-4">
                  <div className="bg-white/80 backdrop-blur px-3 py-1 rounded-full text-[11px] font-bold text-orange-700 border border-orange-200">
                    {selectedRoute.pickUpPoints?.length || 0} Stops
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-extrabold text-gray-900 uppercase tracking-widest text-xs flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  Select Pickup Point
                </h4>
                
                {selectedRoute.pickUpPoints && selectedRoute.pickUpPoints.length > 0 ? (
                  <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-white">
                    <table className="min-w-full divide-y divide-gray-100 text-sm">
                      <thead>
                        <tr className="bg-gray-50/50">
                          <th className="px-5 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-wider">Stop Name</th>
                          <th className="px-5 py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-wider">Time</th>
                          <th className="px-5 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-wider">Fee</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {selectedRoute.pickUpPoints.map((pt: any) => (
                          <tr 
                            key={pt._id} 
                            onClick={() => {
                              if (!isSuccess && !isAssigning) {
                                setSelectedPoint(pt);
                              }
                            }}
                            className={`cursor-pointer transition-colors ${
                              selectedPoint?._id === pt._id 
                                ? "bg-orange-600 text-white" 
                                : "hover:bg-orange-50/30 text-gray-900"
                            } ${(isSuccess || isAssigning) ? "pointer-events-none opacity-80" : ""}`}
                          >
                            <td className="px-5 py-4 font-bold max-w-[200px] leading-tight">
                              <div className="flex items-center gap-2">
                                {selectedPoint?._id === pt._id && <Check size={14} className="flex-shrink-0" />}
                                {pt.pointName}
                              </div>
                            </td>
                            <td className="px-5 py-4 text-center whitespace-nowrap">
                              <span className={`px-3 py-1.5 rounded-lg border font-black text-[12px] shadow-sm ${
                                selectedPoint?._id === pt._id 
                                  ? "bg-white/20 border-white/30 text-white" 
                                  : "bg-gray-100 border-gray-200 text-gray-700"
                              }`}>
                                {formatTime(pt.pickUpTime)}
                              </span>
                            </td>
                            <td className={`px-5 py-4 text-right font-black tabular-nums text-base ${
                              selectedPoint?._id === pt._id ? "text-white" : "text-orange-600"
                            }`}>
                              ₹{pt.amount?.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-2xl p-10 text-center border border-dashed border-gray-200">
                    <p className="text-gray-400 font-medium">No pickup points available for this route.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="p-6 border-t bg-gray-50/50">
          <button 
            onClick={handleConfirm}
            disabled={!selectedPoint || isAssigning || isSuccess}
            className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 ${
              !selectedPoint || isAssigning 
                ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                : isSuccess
                  ? "bg-green-600 text-white shadow-lg shadow-green-600/30"
                  : "bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-600/30"
            }`}
          >
            {isAssigning ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Assigning...
              </>
            ) : isSuccess ? (
              <>
                <Check size={18} strokeWidth={3} />
                Successfully Assigned!
              </>
            ) : (
              "Confirm Route Selection"
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default TransportHostelStageComponent;

