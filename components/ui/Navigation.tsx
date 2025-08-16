'use client';

import { useEffect, useState } from 'react';
import { Container, Group, Button, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';

const navItems = [
  { label: '경력', href: '#experience' },
  { label: '프로젝트', href: '#projects' },
  { label: '사이드 프로젝트', href: '#vibe-coding' },
  { label: '기술', href: '#skills' },
  { label: '오픈소스', href: '#opensource' },
  { label: '연락처', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [opened, { toggle }] = useDisclosure();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-portfolio-background/80 backdrop-blur-lg border-b border-portfolio-surface' : ''
    }`}>
      <Container size="lg" className="py-4">
        <Group justify="space-between">
          <a href="#" className="text-xl font-bold text-portfolio-accent">
            SW.Portfolio
          </a>

          <Group className="hidden md:flex" gap="xs">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="subtle"
                component="a"
                href={item.href}
                color="gray"
              >
                {item.label}
              </Button>
            ))}
          </Group>

          <Group gap="xs">
            <Button
              variant="subtle"
              color="gray"
              component="a"
              href="https://github.com/Seungwoo321"
              target="_blank"
              p="xs"
            >
              <IconBrandGithub size={20} />
            </Button>
            <Button
              variant="subtle"
              color="gray"
              component="a"
              href="https://linkedin.com"
              target="_blank"
              p="xs"
            >
              <IconBrandLinkedin size={20} />
            </Button>
            <Burger
              opened={opened}
              onClick={toggle}
              className="md:hidden"
              size="sm"
            />
          </Group>
        </Group>
      </Container>
    </nav>
  );
}