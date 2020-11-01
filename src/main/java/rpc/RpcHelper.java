package rpc;
// This class is to help the transformaton between Sting and JSON Onject

import java.io.IOException;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONObject;

public class RpcHelper {
	
	//writes a JSONArray to http response
	public static void writeJsonArray(HttpServletResponse response, JSONArray array) throws IOException{
		response.setContentType("application/json");
		response.getWriter().print(array);
	}
	
	//writes JSONObject to http response
	public static void writeJsonObject(HttpServletResponse response, JSONObject obj) throws IOException{
		response.setContentType("application/json");
		response.getWriter().print(obj);
	}

}
