package db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

import entity.TrailItem;
import entity.TrailItem.TrailItemBuilder;

public class MySQLConnection {
	private Connection conn;
	
	//constructor to create the connection to MySQL instance
	public MySQLConnection() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver").getConstructor().newInstance();
			conn = DriverManager.getConnection(MySQLDBUtil.URL);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	//close the connection
	public void close() {
		if (conn != null) {
			try {
				conn.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	
	public void saveItem(TrailItem item) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return;
		}
		String sql = "INSERT IGNORE INTO trails VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setInt(1, item.getTrailId());
			statement.setString(2, item.getTrailName());
			statement.setDouble(3, item.getTrailLength());
			statement.setInt(4, item.getTrailHeight());
			statement.setDouble(5, item.getLatitude());
			statement.setDouble(6, item.getLongitude());
			statement.setString(7, item.getLocationName());
			statement.setString(8, item.getImageUrl());
			statement.setString(9, item.getDifficulty());
			statement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public TrailItem getTrailbyId(String trailId) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return null;
		}
		
		TrailItem item = null;
		String sql = "SELECT * FROM trails WHERE trailId = ?";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, trailId);
			ResultSet rs = statement.executeQuery();
			TrailItemBuilder builder = new TrailItemBuilder();
			if(rs.next()) {
				builder.setTrailId(rs.getInt("trailId"));
				builder.setTrailName(rs.getString("trailName"));
				builder.setTrailLength(rs.getDouble("trailLength"));
				builder.setTrailHeight(rs.getInt("trailHeight"));
				builder.setLatitude(rs.getDouble("laitude"));
				builder.setLongitude(rs.getDouble("longitude"));
				builder.setLocationName(rs.getString("locationName"));
				builder.setImageUrl(rs.getString("imageUrl"));
				builder.setDifficulty(rs.getString("difficulity"));
				item = builder.build();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return item;
	}
	
	public boolean addUser(String userId, String name, String fitnesslevel, String filter) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return false;
		}
		
		String sql = "INSERT IGNORE INTO users VALUES (?, ?, ?, ?)";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, userId);
			statement.setString(2, name);
			statement.setString(3, fitnesslevel);
			statement.setString(4, filter);
			
			return statement.executeUpdate() == 1; //only insert one row, if != 1, means did not insert successfully
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return false;
	}
	
	public boolean addNearby(String userId, int trailId) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return false;
		}
		
		String sql = "INSERT IGNORE INTO nearbys VALUES (?, ?)";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, userId);
			statement.setInt(2, trailId);
//			System.out.print("userId is " + userId);
//			System.out.println("trailId is " + trailId);
//			System.out.println();
			statement.executeUpdate();
			return true;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return false;
	}
	
	public void setUserFilter(String userId, String filter) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return;
		}
		String sql = "UPDATE users SET filter = " + filter + " WHERE userId = " + userId;
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	//NEED TO CHANGE
	public List<TrailItem> getTrailList(String userId){
		if (conn == null) {
			System.err.println("DB connection failed");
			return new ArrayList<>();
		}
		List<TrailItem> trailList = new ArrayList<>();
		
/*	BUSINESS LOGIC
 * 	when in this function, user must has the fitnesslevel
 *  case1: filter == null || filter == 'no', res same as nearby
 *  case2: user click save, filter == 'fitnesslevel', list by fitnesslevel
 *  case3: filter == Chill 
 *  case4: filter == Challenge
 *  case5: filter == Exhausted
 */
		
		return trailList;
	}
}
