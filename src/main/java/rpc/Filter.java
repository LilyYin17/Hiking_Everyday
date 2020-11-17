package rpc;

import java.io.IOException;
import java.util.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import db.MySQLConnection;
import entity.TrailItem;

/**
 * Servlet implementation class Filter
 */
public class Filter extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Filter() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String userId = request.getParameter("userId");
		MySQLConnection conn = new MySQLConnection();
		Set<TrailItem> trailList = conn.getTrailList(userId);
		conn.close();
		
		JSONArray array = new JSONArray();
		for(TrailItem trail : trailList) {
			array.put(trail.toJSONObject());
		}
		conn.close();
		RpcHelper.writeJsonArray(response, array);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		JSONObject input = RpcHelper.readJSONObject(request);
		String userId = input.getString("userId");
		String filter = input.getString("filter");
		
		MySQLConnection conn = new MySQLConnection();
		conn.setUserFilter(userId, filter);
		conn.close();
		RpcHelper.writeJsonObject(response, new JSONObject().put("result", "SUCCESS"));
	}

}
