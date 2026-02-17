
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'screens/hub_screen.dart';
import 'screens/matrix_screen.dart';
import 'screens/wheel_screen.dart';

void main() {
  runApp(const FocusiaApp());
}

class FocusiaApp extends StatelessWidget {
  const FocusiaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Focusia',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF050A18),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF3062FF),
          primary: const Color(0xFF3062FF),
          secondary: const Color(0xFF9B30FF),
          surface: const Color(0xFF101828),
          brightness: Brightness.dark,
        ),
        textTheme: GoogleFonts.manropeTextTheme(ThemeData.dark().textTheme),
      ),
      home: const MainNavigation(),
    );
  }
}

class MainNavigation extends StatefulWidget {
  const MainNavigation({super.key});

  @override
  State<MainNavigation> createState() => _MainNavigationState();
}

class _MainNavigationState extends State<MainNavigation> {
  int _currentIndex = 0;
  final List<Widget> _screens = [
    const HubScreen(),
    const MatrixScreen(),
    const WheelScreen(),
    const Center(child: Text("Focusia Plan")),
    const Center(child: Text("Growth XP")),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          border: Border(top: BorderSide(color: Colors.white.withOpacity(0.05))),
        ),
        child: NavigationBar(
          selectedIndex: _currentIndex,
          onDestinationSelected: (index) => setState(() => _currentIndex = index),
          backgroundColor: const Color(0xFF050A18).withOpacity(0.9),
          indicatorColor: const Color(0xFF3062FF).withOpacity(0.2),
          destinations: const [
            NavigationDestination(icon: Icon(Icons.dashboard_outlined), selectedIcon: Icon(Icons.dashboard, color: Color(0xFF3062FF)), label: 'Hub'),
            NavigationDestination(icon: Icon(Icons.grid_view_outlined), selectedIcon: Icon(Icons.grid_view, color: Color(0xFF3062FF)), label: 'Matrix'),
            NavigationDestination(
              icon: CircleAvatar(
                radius: 18,
                backgroundColor: Color(0xFF3062FF),
                child: Icon(Icons.add, color: Colors.white),
              ),
              label: 'Focus',
            ),
            NavigationDestination(icon: Icon(Icons.task_alt), label: 'Plan'),
            NavigationDestination(icon: Icon(Icons.person_outline), label: 'XP'),
          ],
        ),
      ),
    );
  }
}
