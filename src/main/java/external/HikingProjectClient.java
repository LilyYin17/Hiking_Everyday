package external;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
//import java.io.UnsupportedEncodingException;
//import java.net.URLEncoder;

import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.json.JSONArray;
import org.json.JSONObject;

// https://www.hikingproject.com/data

public class HikingProjectClient {
	private static final String URL_TEMPLATE = 
			"https://www.hikingproject.com/data/get-trails?lat=%s&lon=%s&maxDistance=10&key=200963304-3031291d27bc85ca2a090820541b43f2";
	
	//default distance is 10
	public JSONArray search(double lat, double lon) {
		String url = String.format(URL_TEMPLATE, lat, lon);
		CloseableHttpClient httpClient = HttpClients.createDefault();
		try {
			CloseableHttpResponse response = httpClient.execute(new HttpGet(url));
			if(response.getStatusLine().getStatusCode() != 200) {
				return new JSONArray();
			}
			HttpEntity entity = response.getEntity();
			if(entity == null) {
				return new JSONArray();
			}
			BufferedReader reader = new BufferedReader(new InputStreamReader(entity.getContent()));
			StringBuilder responseBody = new StringBuilder();
			String line = null;
			while((line = reader.readLine()) != null) {
				responseBody.append(line);
			}
			JSONObject obj = new JSONObject(responseBody.toString());
			return obj.getJSONArray("trails");
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new JSONArray();
	}
	
	public static void main(String[] args) {
		HikingProjectClient client = new HikingProjectClient();
		JSONArray trails = client.search(40.0274, -105.2519); //lat=40.0274&lon=-105.2519 as test case
		try {
			for(int i = 0; i < trails.length(); i++) {
				JSONObject job = trails.getJSONObject(i);
				System.out.println(job.toString(2));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}





