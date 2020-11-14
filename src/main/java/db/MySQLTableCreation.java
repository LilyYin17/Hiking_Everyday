package db;

import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.Connection;

public class MySQLTableCreation {
	// Run this as Java application to reset the database.
	public static void main(String[] args) {
		try {
			// Step 1 Connect to MySQL.
			System.out.println("Connecting to " + MySQLDBUtil.URL);
			Class.forName("com.mysql.cj.jdbc.Driver").getConstructor().newInstance();
			Connection conn = DriverManager.getConnection(MySQLDBUtil.URL);

			if (conn == null) {
				return;
			}
			
			// Step 2 Drop tables in case they exist.
			Statement statement = conn.createStatement();

			String sql = "DROP TABLE IF EXISTS nearbys";
			statement.executeUpdate(sql);
			
			sql = "DROP TABLE IF EXISTS trails";
			statement.executeUpdate(sql);
			
			sql = "DROP TABLE IF EXISTS users";
			statement.executeUpdate(sql);
			
			// Step 3 Create new tables
			sql = "CREATE TABLE trails ("
					+ "trailId VARCHAR(255) NOT NULL,"
					+ "trailName VARCHAR(255),"
					+ "trailLength VARCHAR(255),"
					+ "trailHeight VARCHAR(255),"
					+ "laitude VARCHAR(255),"
					+ "longitude VARCHAR(255),"
					+ "locationName VARCHAR(255),"
					+ "imageUrl VARCHAR(255),"
					+ "difficulity VARCHAR(255),"
					+ "PRIMARY KEY (trailId)"
					+ ")";
			statement.executeUpdate(sql);
					
			sql = "CREATE TABLE users ("
					+ "userId VARCHAR(255) NOT NULL,"
					+ "name VARCHAR(255),"
					+ "fitnesslevel VARCHAR(255),"
					+ "filter VARCHAR(255),"
					+ "PRIMARY KEY (userId)"
					+ ")";
			statement.executeUpdate(sql);
		
			sql = "CREATE TABLE nearbys ("
					+ "userId VARCHAR(255) NOT NULL,"
					+ "trailId VARCHAR(255) NOT NULL,"
					+ "PRIMARY KEY (trailId),"
					+ "FOREIGN KEY (userId) REFERENCES users(userId),"
					+ "FOREIGN KEY (trailId) REFERENCES trails(trailId)"
					+ ")";
			statement.executeUpdate(sql);
				
					
			sql = "INSERT INTO users VALUES('1111', 'John', 'Easy', 'null')";
			statement.executeUpdate(sql);

			conn.close();
			System.out.println("Import done successfully");

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}


