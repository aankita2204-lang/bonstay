// Static mock data extracted from db.json - no backend required

export const mockUsers = [
    {
        id: "1",
        name: "Maria",
        address: "Bangalore,Karnataka",
        email: "maria@gmail.com",
        phoneNo: 1234567890,
        password: "maria123456"
    },
    {
        id: "2",
        name: "Setna",
        address: "Bangalore",
        phoneNo: "1234567890",
        email: "setna@gmail.com",
        password: "Setna@123"
    },
    {
        id: "3",
        name: "Sera",
        address: "bangalore",
        phoneNo: "1234567890",
        email: "sera@gmail.com",
        password: "Sera@1234"
    },
    {
        id: "4",
        name: "Daisy",
        address: "Bangalore",
        phoneNo: "1234567890",
        email: "daisy@gmail.com",
        password: "Daisy@123"
    }
];

export const mockHotels = [
    {
        id: "1",
        hotelName: "Paradise Stay",
        city: "Bangalore",
        description: "A home to relax at the 'city' peek with all the facilities near you",
        amenities: "Different Cuisine Food, Swimming Pool, Self Cooking Station",
        phoneNo: 9090909090,
        address: "120/1C, Bangalore, Karnataka",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        reviews: ["Good Accomodation", "Best place to relax with friends and family", "The best place to chill with friends.", "The best place I ever visited.", "Great hotel and service!"]
    },
    {
        id: "2",
        hotelName: "Hill Palace",
        city: "Kochi",
        description: "A cool place to relax at Lake side",
        amenities: "Homely Food, Sea Food, Children's Park, Boating",
        phoneNo: 9191919191,
        address: "90/1A, Kochi, Kerala",
        imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
        reviews: ["Must visit place. The cuisine available here is so amazing.", "My favorite place to relax on my vacations"]
    },
    {
        id: "3",
        hotelName: "Monsoon Stay",
        city: "Chennai",
        description: "A luxurious but affordable stay as in your home",
        amenities: "24 hr Homely Food, Security, Children's Park",
        phoneNo: 9292929292,
        address: "100/1A, Chennai, Tamil Nadu",
        imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
        reviews: []
    },
    {
        id: "4",
        hotelName: "Galaxy Paradise",
        city: "Mumbai",
        description: "An affordable family stay spot at the 'City' heart",
        amenities: "24 hr Homely Food, Swimming Pool, Security",
        phoneNo: 9393939393,
        address: "190/1B, Mumbai, Maharastra",
        imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
        reviews: []
    }
];

export const mockBookings = [
    {
        id: "1",
        startDate: "2020-09-22",
        endDate: "2020-09-27",
        noOfPersons: 1,
        noOfRooms: 1,
        typeOfRoom: "AC",
        hotelName: "Paradise Stay",
        hotelId: 1,
        userId: 1
    },
    {
        id: "2",
        startDate: "2020-09-23",
        endDate: "2020-09-24",
        noOfPersons: 1,
        noOfRooms: 1,
        typeOfRoom: "AC",
        hotelId: 1,
        hotelName: "Paradise Stay",
        userId: 1
    },
    {
        id: "3",
        startDate: "2020-09-30",
        endDate: "2020-10-01",
        noOfPersons: 1,
        noOfRooms: 1,
        typeOfRoom: "AC",
        hotelId: 1,
        hotelName: "Paradise Stay",
        userId: 2
    }
];

// In-memory state for bookings and reviews (simulates database)
let bookingsState = [...mockBookings];
let hotelsState = [...mockHotels];
let usersState = [...mockUsers];
let nextBookingId = 100;
let nextUserId = 100;

// Mock API functions
export const mockApi = {
    // Hotels
    getHotels: () => Promise.resolve([...hotelsState]),
    getHotelById: (id) => {
        const hotel = hotelsState.find(h => h.id === String(id));
        return hotel ? Promise.resolve({ ...hotel }) : Promise.reject(new Error("Hotel not found"));
    },
    addReview: (hotelId, review) => {
        const hotel = hotelsState.find(h => h.id === String(hotelId));
        if (hotel) {
            hotel.reviews = [...hotel.reviews, review];
            return Promise.resolve({ ...hotel });
        }
        return Promise.reject(new Error("Hotel not found"));
    },

    // Bookings
    getBookingsByUserId: (userId) => {
        const userBookings = bookingsState.filter(b => String(b.userId) === String(userId));
        return Promise.resolve([...userBookings]);
    },
    getBookingById: (id) => {
        const booking = bookingsState.find(b => b.id === String(id));
        return booking ? Promise.resolve({ ...booking }) : Promise.reject(new Error("Booking not found"));
    },
    createBooking: (bookingData) => {
        const newBooking = { ...bookingData, id: String(nextBookingId++) };
        bookingsState.push(newBooking);
        return Promise.resolve({ ...newBooking });
    },
    updateBooking: (id, updates) => {
        const index = bookingsState.findIndex(b => b.id === String(id));
        if (index !== -1) {
            bookingsState[index] = { ...bookingsState[index], ...updates };
            return Promise.resolve({ ...bookingsState[index] });
        }
        return Promise.reject(new Error("Booking not found"));
    },
    deleteBooking: (id) => {
        const index = bookingsState.findIndex(b => b.id === String(id));
        if (index !== -1) {
            bookingsState.splice(index, 1);
            return Promise.resolve({ success: true });
        }
        return Promise.reject(new Error("Booking not found"));
    },

    // Users
    login: (email, password) => {
        const user = usersState.find(u => u.email === email && u.password === password);
        return user ? Promise.resolve([{ ...user }]) : Promise.resolve([]);
    },
    register: (userData) => {
        const newUser = { ...userData, id: String(nextUserId++) };
        usersState.push(newUser);
        return Promise.resolve({ ...newUser });
    },

    // Reset state (useful for testing)
    resetState: () => {
        bookingsState = [...mockBookings];
        hotelsState = [...mockHotels];
        usersState = [...mockUsers];
        nextBookingId = 100;
        nextUserId = 100;
    }
};

export default mockApi;
