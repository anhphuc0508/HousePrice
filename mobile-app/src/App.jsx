import { useState, useEffect } from 'react'

const MAPPINGS = {
  houseDirection: [
    { label: "Bắc", value: 0 },
    { label: "Nam", value: 1 },
    { label: "Tây", value: 2 },
    { label: "Tây - Bắc", value: 3 },
    { label: "Tây - Nam", value: 4 },
    { label: "Đông", value: 5 },
    { label: "Đông - Bắc", value: 6 },
    { label: "Đông - Nam", value: 7 }
  ],
  balconyDirection: [
    { label: "Bắc", value: 0 },
    { label: "Nam", value: 1 },
    { label: "Tây", value: 2 },
    { label: "Tây - Bắc", value: 3 },
    { label: "Tây - Nam", value: 4 },
    { label: "Đông", value: 5 },
    { label: "Đông - Bắc", value: 6 },
    { label: "Đông - Nam", value: 7 }
  ],
  legalStatus: [
    { label: "Đã có sổ", value: 0 },
    { label: "Hợp đồng mua bán", value: 1 }
  ],
  furniture: [
    { label: "Cơ bản", value: 0 },
    { label: "Đầy đủ (Full)", value: 1 }
  ]
};

function App() {
  const [formData, setFormData] = useState({
    Area: "80",
    Frontage: "5",
    "Access Road": "4",
    "House direction": "7",
    "Balcony direction": "7",
    Floors: "2",
    Bedrooms: "3",
    Bathrooms: "2",
    "Legal status": "0",
    "Furniture state": "1"
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    try {
      // Tự động lấy IP của máy tính host
      const hostIP = window.location.hostname;
      const response = await fetch(`http://${hostIP}:5001/houseprice/v1/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      if (response.ok) {
        setResult(data.prediction_price_billion_vnd);
      } else {
        setError(data.error || "Có lỗi xảy ra từ máy chủ.");
      }
    } catch (err) {
      setError("Không thể kết nối đến máy chủ. Kiểm tra lại WiFi hoặc Tường lửa.");
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>PredictHouse AI</h1>
        <p>Hệ thống dự đoán giá nhà thông minh</p>
      </header>

      <main className="form-content">
        <div className="input-group">
          <label>Diện tích (m²)</label>
          <input type="number" name="Area" value={formData.Area} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Mặt tiền (m)</label>
          <input type="number" name="Frontage" value={formData.Frontage} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Đường vào (m)</label>
          <input type="number" name="Access Road" value={formData["Access Road"]} onChange={handleChange} />
        </div>

        <div style={{display: 'flex', gap: '16px'}}>
          <div className="input-group" style={{flex: 1}}>
            <label>Số tầng</label>
            <input type="number" name="Floors" value={formData.Floors} onChange={handleChange} />
          </div>
          <div className="input-group" style={{flex: 1}}>
            <label>Phòng ngủ</label>
            <input type="number" name="Bedrooms" value={formData.Bedrooms} onChange={handleChange} />
          </div>
          <div className="input-group" style={{flex: 1}}>
            <label>Nhà vệ sinh</label>
            <input type="number" name="Bathrooms" value={formData.Bathrooms} onChange={handleChange} />
          </div>
        </div>

        <div className="input-group">
          <label>Hướng nhà</label>
          <div className="select-wrapper">
            <select name="House direction" value={formData["House direction"]} onChange={handleChange}>
              {MAPPINGS.houseDirection.map(item => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="input-group">
          <label>Hướng ban công</label>
          <div className="select-wrapper">
            <select name="Balcony direction" value={formData["Balcony direction"]} onChange={handleChange}>
              {MAPPINGS.balconyDirection.map(item => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="input-group">
          <label>Pháp lý</label>
          <div className="select-wrapper">
            <select name="Legal status" value={formData["Legal status"]} onChange={handleChange}>
              {MAPPINGS.legalStatus.map(item => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="input-group">
          <label>Tình trạng Nội thất</label>
          <div className="select-wrapper">
            <select name="Furniture state" value={formData["Furniture state"]} onChange={handleChange}>
              {MAPPINGS.furniture.map(item => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>
        </div>

      </main>

      <div className="bottom-action">
        <button 
          className="predict-btn" 
          onClick={handlePredict} 
          disabled={loading}
        >
          {loading ? <div className="spinner"></div> : "Dự đoán Giá trị"}
        </button>
      </div>

      {/* Result Modal */}
      {(result !== null || error) && (
        <div className="modal-overlay" onClick={() => {setResult(null); setError(null)}}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Kết quả Dự đoán</h2>
              <button className="close-btn" onClick={() => {setResult(null); setError(null)}}>×</button>
            </div>
            
            {error ? (
              <div style={{color: '#ef4444', textAlign: 'center', padding: '20px 0'}}>
                {error}
              </div>
            ) : (
              <div className="price-display">
                <div className="price-label">Giá trị căn nhà ước tính</div>
                <div className="price-value">
                  {parseFloat(result).toFixed(2)}
                  <span className="price-unit">Tỷ VNĐ</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
