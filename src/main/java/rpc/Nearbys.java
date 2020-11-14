package rpc;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import db.MySQLConnection;

/**
 * Servlet implementation class Nearbys
 */
public class Nearbys extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Nearbys() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//parse request body, get item and user information
		//call setNearbyItem
		//return OK
		MySQLConnection conn = new MySQLConnection();
		JSONObject input = RpcHelper.readJSONObject(request);
		String userId = input.getString("userId");
		int trailId = input.getInt("trailId");
		
		JSONObject obj = new JSONObject();
		if (conn.addNearby(userId, trailId)) {
			obj.put("status", "OK");
		} else {
			obj.put("status", "Nearby Already Exists");
		}
		conn.close();
		RpcHelper.writeJsonObject(response, obj);		
	}

}
