const GOOGLE_CLIENT_ID = "15670792015-5pehjr9jqnmqceossuqhp3jbbid0joc3.apps.googleusercontent.com";
const REDIRECT_URI = "https://planme.vercel.app/google-auth";
const SCOPES = [
    "https://www.googleapis.com/auth/classroom.courses.readonly",
    "https://www.googleapis.com/auth/classroom.course-work.readonly",
    "https://www.googleapis.com/auth/classroom.student-submissions.me.readonly",
    "https://www.googleapis.com/auth/userinfo.email",
];

export const handleGoogleSignIn = () => {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(SCOPES.join(' '))}&access_type=offline&prompt=consent`;
    window.location.href = authUrl;
};
