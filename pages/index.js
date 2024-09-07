import React, { useState, useEffect } from "react"
import { Menu, CheckCircle, Moon, Sun, ChevronDown } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Auth } from "../components/Auth"
import Link from 'next/link'
import { useRouter } from 'next/router';
import ApplicationForm from '../components/ApplicationForm';

export default function PulseGG() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const router = useRouter();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const navItems = ["Feed", "About", "Join", "Links", "Group Directories"]

  const handleUpdateContact = () => {
    // Implement update contact information logic here
    console.log("Update contact information")
  }

  const handleChangeProfilePicture = () => {
    // Implement change profile picture logic here
    console.log("Change profile picture")
  }

  const verifiedGroups = [
    "CCNY Mela Mahem",
    "CCNY MSA",
    "CCNY MSOWII",
    "CCNY BSA"
  ]

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="fixed inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 dark:from-gray-900 dark:to-indigo-900 animate-gradient-xy -z-10"></div>
      <header className="bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 shadow-lg backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="text-4xl font-bold animate-fade-in">
              <span className="text-blue-600 dark:text-blue-400">Pulse</span>
              <span className="text-indigo-600 dark:text-indigo-400">.</span>
              <span className="text-purple-600 dark:text-purple-400">GG</span>
            </div>
            <nav className="hidden md:flex space-x-4 items-center">
              <Auth />
              <div className="relative">
                <Button
                  variant="ghost"
                  className="text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Menu <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 animate-fade-in">
                    {navItems.map((item) => (
                      <Button
                        key={item}
                        variant="ghost"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
                      >
                        {item}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              <Button variant="ghost" onClick={() => setDarkMode(!darkMode)} className="text-gray-800 dark:text-gray-200">
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </nav>
            <Button variant="ghost" size="icon" className="md:hidden text-gray-800 dark:text-gray-200" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 animate-slide-in">
          <div className="container mx-auto px-4 py-2">
            <Auth />
            {navItems.map((item) => (
              <Button key={item} variant="ghost" className="w-full justify-start text-gray-800 dark:text-gray-200">
                {item}
              </Button>
            ))}
            <Button variant="ghost" className="w-full justify-start text-gray-800 dark:text-gray-200" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="h-5 w-5 mr-2" />}
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </div>
        </div>
      )}

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-center">
        <div className="md:w-3/5 md:pr-8 mb-8 md:mb-0 text-center">
          <h1 className="text-5xl font-bold mb-6 text-white animate-fade-in">Welcome to Pulse.GG</h1>
          <p className="mb-6 text-lg text-gray-200 animate-fade-in delay-200">
            Pulse.GG is the place where verified college groups can post News Blogs and daily updates. 
            Stay informed and connect with your college community.
          </p>
          <p className="mb-6 text-xl font-semibold text-yellow-300 animate-fade-in delay-400">
            Pulse.GG currently only supports CUNY City College of New York groups to post on Pulse.GG Applications!
          </p>
          <h2 className="text-3xl font-bold mb-6 text-white animate-fade-in delay-600">Verified Groups</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {verifiedGroups.map((group, index) => (
              <Link href={`/group/${encodeURIComponent(group)}`} key={group}>
                <Button
                  className={`w-full justify-center text-sm py-2 animate-slide-in delay-${(index + 4) * 200} 
                              bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300`}
                >
                  <CheckCircle className="w-4 h-4 mr-2" /> {group}
                </Button>
              </Link>
            ))}
          </div>
          <Button 
            onClick={() => router.push('/apply-for-verification')} 
            className="animate-slide-in delay-1400 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Apply for Verification
          </Button>
        </div>

        <div className="md:w-2/5">
          <h2 className="text-3xl font-bold mb-6 text-center text-white animate-fade-in delay-200">Latest Updates</h2>
          <div className="space-y-6">
            <BlogPost
              title="CCNY Mela Mahem: Cultural Festival Announcement"
              content="Join us for our annual cultural festival celebrating South Asian heritage. Enjoy music, dance, and delicious food!"
              author="CCNY Mela Mahem"
              date="May 15, 2023"
              delay={400}
            />
            <BlogPost
              title="CCNY MSA: Ramadan Iftar Gathering"
              content="We're hosting a community Iftar during Ramadan. All students are welcome to join us for breaking the fast and spiritual reflection."
              author="CCNY MSA"
              date="May 10, 2023"
              delay={600}
            />
            <BlogPost
              title="CCNY MSOWII: Women in STEM Panel Discussion"
              content="Don't miss our upcoming panel featuring successful women in STEM fields. Get inspired and learn about career opportunities!"
              author="CCNY MSOWII"
              date="May 5, 2023"
              delay={800}
            />
          </div>
        </div>
      </main>

      <footer className="bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 mt-auto backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-300">
          © 2023 Pulse.GG. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

function BlogPost({ title, content, author, date, delay }) {
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg animate-slide-in delay-${delay} bg-white dark:bg-gray-800`}>
      <CardHeader className="bg-indigo-600 dark:bg-indigo-800 text-white">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="bg-white dark:bg-gray-800">
        <p className="text-sm mb-2 text-gray-600 dark:text-gray-300">{content}</p>
        <div className="text-xs flex justify-between items-center text-gray-500 dark:text-gray-400">
          <span className="flex items-center">
            <CheckCircle className="w-3 h-3 mr-1 text-green-500" /> {author}
          </span>
          <span>{date}</span>
        </div>
      </CardContent>
    </Card>
  )
}