import { DataTypes, Model, Sequelize } from 'sequelize';

class User extends Model {

	public static initialize = (sequelize: Sequelize): void => {
		User.init({
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			username: {
				type: DataTypes.STRING(20),
				allowNull: false,
				unique: true
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true
				}
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false
			}
		}, {
			sequelize,
			timestamps: true,
			updatedAt: false,
		});
	}

}

export default User;