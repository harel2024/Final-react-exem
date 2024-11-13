import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    
    // בדיקה אם הכותרת קיימת ומתחילה במילת המפתח 'Bearer'
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Access token is missing or improperly formatted" });
      return;  // אנחנו כאן צריכים לשים return כדי לא להמשיך את הביצוע אחרי שליחת תשובה
    }
  
    // חילוץ הטוקן לאחר 'Bearer '
    const token = authHeader.split(" ")[1];
  
    try {
      const secret = process.env.JWT_SECRET || "your_jwt_secret";
      const decoded = jwt.verify(token, secret);
      (req as any).user = decoded; // שמירת פרטי המשתמש בבקשה לשימוש עתידי
      next(); // לעבור למידלוואר הבא או לפונקציה הבאה בשרשרת
    } catch (error) {
      res.status(403).json({ message: "Invalid token", error });
    }
  };
  



