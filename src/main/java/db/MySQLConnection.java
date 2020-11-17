package db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

import JustForYou.JustForYou;
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
		
		String sql = "UPDATE users SET filter=? WHERE userId=?";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, filter);
			statement.setString(2, userId);
			statement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public Set<TrailItem> getTrailList(String userId){
		if (conn == null) {
			System.err.println("DB connection failed");
			return new HashSet<>();
		}
		Set<TrailItem> trailList = new HashSet<>();
		
		//step1: get the user's filter
		String userFilter = getUserFilterById(userId);
		
		//step2: business logic to select the corresponding trail
		if(userFilter.equals("no")) {
			return trailList; 
		} else if(userFilter.equals("default")) {
			String userFitnessLevel = getUserFitnesslevel(userId);
			if(userFitnessLevel.equals("Easy")) userFilter = "Chill";
			else if(userFitnessLevel.equals("Intermediate")) userFilter = "Challenge";
			else userFilter = "Exhausted";
		}
		System.out.println("user filter is " + userFilter);
		
		//step3: get user's nearby trails
		Set<Integer> nearbyTrails = getNearbyTrails(userId);
		
		//step4: sql to get all the trails
		Set<Integer> filterTrailList = new HashSet<>();
		if(userFilter.equals("Chill")) {
			String filter1 = "green";
			String filter2 = "greenBlue";
			filterTrailList = getTrailListHelper(filter1, filter2);
		} else if(userFilter.equals("Challenge")) {
			String filter1 = "blue";
			filterTrailList = getTrailListHelper(filter1, filter1);
		} else if (userFilter.equals("Exhausted")) {
			String filter1 = "blueBlack";
			String filter2 = "black";
			filterTrailList = getTrailListHelper(filter1, filter2);
		}
		
		JustForYou getRecommend = new JustForYou();
		trailList = getRecommend.recommend(nearbyTrails, filterTrailList);
		System.out.println(trailList.size());
		return trailList;
	}
	
	//find all the trailId which satisfied the filter
	private Set<Integer> getTrailListHelper(String filter1, String filter2){
		if (conn == null) {
			System.err.println("DB connection failed");
			return new HashSet<>();
		}
		Set<Integer> filterTrailList = new HashSet<>();
		String sql = "SELECT * FROM trails WHERE difficulity = ?";
		
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, filter1);
			ResultSet rs = statement.executeQuery();
			while (rs.next()) {
				filterTrailList.add(rs.getInt("trailId"));
			}
			
			statement.setString(1, filter2);
			rs = statement.executeQuery();
			while (rs.next()) {
				filterTrailList.add(rs.getInt("trailId"));
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return filterTrailList;
	}
	
	//help function to find user's nearby trails by given userId
	private Set<Integer> getNearbyTrails(String userId){
		if (conn == null) {
			System.err.println("DB connection failed");
			return new HashSet<>();
		}
		Set<Integer> nearbyTrails = new HashSet<>();
		String sql = "SELECT * FROM nearbys WHERE userId = ?";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, userId);
			ResultSet rs = statement.executeQuery();
			while(rs.next()) {
				nearbyTrails.add(rs.getInt("trailId"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return nearbyTrails;
	}
	
	//help function to find user's filter by given userId
	private String getUserFilterById(String userId) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return "no";
		}
		String userFilter = "no";
		String sql = "SELECT filter FROM users WHERE userId = ?";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, userId);
			ResultSet rs = statement.executeQuery();
			if(rs.next()) {
				userFilter = rs.getString("filter");
				return userFilter;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return userFilter;
	}
	
	//help function to find user's fitnesslevel by given userId
	private String getUserFitnesslevel(String userId) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return "empty";
		}
		String userFitnesslevel = "empty";
		String sql = "SELECT fitnesslevel FROM users WHERE userId = ?";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, userId);
			ResultSet rs = statement.executeQuery();
			if(rs.next()) {
				userFitnesslevel = rs.getString("fitnesslevel");
				System.out.println("user fitnesslevel is " + userFitnesslevel);
				return userFitnesslevel;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return userFitnesslevel;
	}
}
