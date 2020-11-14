package rpc;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import db.MySQLConnection;

/**
 * Servlet implementation class Register
 */
public class Register extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Register() {
        super();
        // TODO Auto-generated constructor stub
    }
    
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		JSONObject input = RpcHelper.readJSONObject(request);
		String userId = input.getString("userId");
		String userName = input.getString("name");
		String level = input.getString("fitnesslevel");
		String filter = input.getString("filter");
		
		MySQLConnection conn = new MySQLConnection();
		JSONObject obj = new JSONObject();
		if(conn.addUser(userId, userName, level, filter)) {
			obj.put("status", "OK");
		} else {
			obj.put("status", "Username Already Exists");
		}
		conn.close();
		RpcHelper.writeJsonObject(response, obj);
	}

}
